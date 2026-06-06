# 🚀 CDC Product Sync System (PostgreSQL → Kafka → MongoDB)

## 📌 Overview
This project implements a Change Data Capture (CDC) pipeline using:
- PostgreSQL (Write DB)
- Debezium + Kafka (Event Streaming)
- MongoDB (Read Model)
- Node.js Microservices (Write + Read Services)

---

## 🏗 Architecture
Write Service → PostgreSQL → Debezium → Kafka → Read Service → MongoDB

---

## ⚙️ Setup Instructions

### 1. Start all services
```bash
docker compose up -d --build