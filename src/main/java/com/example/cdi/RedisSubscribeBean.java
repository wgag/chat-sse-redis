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
import java.util.function.Consumer;

@ApplicationScoped
public class RedisSubscribeBean {
    private RedisClient client;
    private StatefulRedisPubSubConnection<String, String> connection;
    private RedisPubSubReactiveCommands<String, String> commands;

    @PostConstruct
    public void init() {
        client = RedisClient.create("redis://localhost:6379");
        connection = client.connectPubSub();
        commands = connection.reactive();
        commands.subscribe("channel").block();
    }

    @PreDestroy
    public void teardown() {
        commands.unsubscribe("channel");
        connection.close();
        client.shutdown();
    }

    public void listener(Consumer<Message> callback) {
        commands.observeChannels().doOnNext(message -> {
            try {
                String payload = message.getMessage();
                callback.accept(new ObjectMapper().readValue(payload, Message.class));
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }).subscribe();
    }
}
