package emp;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(url = "http://localhost:8082/add", value = "address")
public interface AddressClient {
	@GetMapping("/{id}")
	public Address getAdd(@PathVariable int id);
}
