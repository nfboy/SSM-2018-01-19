package com.song.ssm.service;

import com.song.ssm.entity.User;

import java.util.List;

public interface UserService {

    List<User> getUserList(int offset, int limit);
}
