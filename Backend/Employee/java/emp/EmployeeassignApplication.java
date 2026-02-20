package emp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class EmployeeassignApplication {
	public static void main(String[] args) {
		SpringApplication.run(EmployeeassignApplication.class, args);
	}
}