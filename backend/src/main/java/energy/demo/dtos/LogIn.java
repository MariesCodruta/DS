package energy.demo.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class LogIn {
    public LogIn(String username, String password) {
        this.username = username;
        this.password = password;
    }

    private String username;
    private String password;
}
