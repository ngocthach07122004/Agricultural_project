package Agricultural.mapper;

import Agricultural.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "password" , ignore = true)
    @Mapping(target = "idUser" , ignore = true)
    User toUser (User user);

    @Mapping(target = "idUser", ignore = true)
    void updateUser (@MappingTarget User userTarget, User userUpdate);
}
