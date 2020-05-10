package com.example.rest;

import com.example.cdi.RedisSubscribeBean;
import com.example.data.Message;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.sse.OutboundSseEvent;
import javax.ws.rs.sse.Sse;
import javax.ws.rs.sse.SseEventSink;

@Path("/timeline")
@RequestScoped
public class TimelineResource {
    @Inject
    RedisSubscribeBean redisSubscribeBean;

    @GET
    @Produces(MediaType.SERVER_SENT_EVENTS)
    public void timeline(@Context SseEventSink eventSink, @Context Sse sse) {
        redisSubscribeBean.listener(message -> {
            OutboundSseEvent event = sse.newEventBuilder()
                    .mediaType(MediaType.APPLICATION_JSON_TYPE)
                    .data(Message.class, message)
                    .build();
            eventSink.send(event);
        });
    }
}
