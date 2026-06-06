const { Kafka } = require("kafkajs");
const { getDB } = require("../config/db");

const kafka = new Kafka({
  clientId: "read-service",
  brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({ groupId: process.env.GROUP_ID });

// for idempotency tracking
const processedEvents = new Set();

async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({
    topic: process.env.KAFKA_TOPIC,
    fromBeginning: true,
  });

  const db = getDB();
  const collection = db.collection("products");

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;

      const event = JSON.parse(message.value.toString());

      const id = event?.payload?.after?.id || event?.payload?.before?.id;
      const op = event?.payload?.op;

      const eventId = message.offset + "-" + id;

      // ✅ IDEMPOTENCY CHECK
      if (processedEvents.has(eventId)) return;
      processedEvents.add(eventId);

      const after = event?.payload?.after;

      // CREATE / UPDATE
      if (op === "c" || op === "u") {
        if (!after) return;

        await collection.updateOne(
          { id: after.id },
          { $set: after },
          { upsert: true }
        );
      }

      // DELETE (soft delete or tombstone)
      if (op === "d") {
        await collection.deleteOne({ id });
      }
    },
  });

  console.log("Kafka consumer started");
}

module.exports = { startConsumer };