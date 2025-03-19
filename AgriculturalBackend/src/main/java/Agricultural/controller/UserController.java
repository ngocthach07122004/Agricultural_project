package Agricultural.controller;

import Agricultural.dto.request.UserRequest;
import Agricultural.dto.response.ApiResponse;

import Agricultural.entity.User;
import Agricultural.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;

    @PostMapping("/create")
    public User createUser (@RequestBody User user) {
        return userService.createUser(user);
    }
    @PostMapping("/authenticate")
    public ApiResponse<?> authenticateUser (@RequestBody UserRequest userRequest){
        return userService.authenticateUser(userRequest);
    }
    @GetMapping("/{idUser}")
    public User getSpecificUser  (@PathVariable String idUser) {
        return userService.getSpecificUser(idUser);
    }
    @PutMapping("/update/{idUser}")
    public String updateUser (@PathVariable String idUser,@RequestBody User user) {
        return userService.updateUser(idUser,user);

    }
    @GetMapping("/all")
    public List<User> getAllUser(){
        return userService.getAllUser();
    }

}
