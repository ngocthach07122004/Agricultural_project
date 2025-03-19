package Agricultural.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;


@Data
@Builder
@FieldDefaults(level =  AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @GeneratedValue(strategy = GenerationType.UUID)
    @Id
    String idUser 		;
    String userName  ;
    String name;
    String fullName;
    String password	 ;
    String email;
    String phoneNumber;
    String gender;
    Date dateOfBirth;

}

