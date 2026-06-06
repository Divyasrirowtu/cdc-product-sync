$body = @{
    name = "products-connector"
    config = @{
        "connector.class" = "io.debezium.connector.postgresql.PostgresConnector"
        "database.hostname" = "postgres"
        "database.port" = "5432"
        "database.user" = "user"
        "database.password" = "password"
        "database.dbname" = "products_db"
        "database.server.name" = "pg-server"
        "table.include.list" = "public.products"
        "plugin.name" = "pgoutput"
        "slot.name" = "debezium_slot"
        "tombstones.on.delete" = "true"
        "publication.autocreate.mode" = "filtered"
    }
} | ConvertTo-Json -Depth 10

Invoke-RestMethod `
    -Method Post `
    -Uri "http://localhost:8083/connectors" `
    -ContentType "application/json" `
    -Body $body
    