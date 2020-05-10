package com.example.rest;

import com.example.cdi.RedisPublishBean;
import com.example.data.Message;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/message")
@RequestScoped
public class MessageResource {
    @Inject
    RedisPublishBean redisPublishBean;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response post(Message message) {
        redisPublishBean.publish(message);
        return Response.ok().build();
    }
}
