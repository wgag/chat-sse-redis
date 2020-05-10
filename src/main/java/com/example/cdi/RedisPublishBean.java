package com.example.cdi;

import com.example.data.Message;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.lettuce.core.RedisClient;
import io.lettuce.core.pubsub.StatefulRedisPubSubConnection;
import io.lettuce.core.pubsub.api.reactive.RedisPubSubReactiveCommands;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RedisPublishBean {
    private RedisClient client;
    private StatefulRedisPubSubConnection<String, String> connection;
    private RedisPubSubReactiveCommands<String, String> commands;

    @PostConstruct
    public void init() {
        client = RedisClient.create("redis://localhost:6379");
        connection = client.connectPubSub();
        commands = connection.reactive();
    }

    @PreDestroy
    public void teardown() {
        connection.close();
        client.shutdown();
    }

    public void publish(Message message) {
        try {
            String json = new ObjectMapper().writeValueAsString(message);
            commands.publish("channel", json)
                    .subscribe();
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
