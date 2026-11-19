FROM maven:3.9.8-eclipse-temurin-21-jammy AS builder
LABEL authors="karenads"

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

COPY --from=builder /app/target/fisiocare-0.0.1-SNAPSHOT.jar .

EXPOSE 8080

ENTRYPOINT ["java", "-jar","fisiocare-0.0.1-SNAPSHOT.jar"]