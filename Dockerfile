FROM maven:3-eclipse-temurin-25-noble AS builder


WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

FROM eclipse-temurin:25-jre-noble

WORKDIR /app

COPY --from=builder /app/target/fisiocare-0.0.1-SNAPSHOT.jar .

EXPOSE 8080

ENTRYPOINT ["java", "-jar","fisiocare-0.0.1-SNAPSHOT.jar"]