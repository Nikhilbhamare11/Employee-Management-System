package emp;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(url = "http://localhost:8082/add", value = "address")
public interface AddressClient {
	@GetMapping("/{id}")
	public Address getAdd(@PathVariable("id") int id);

	@GetMapping
	public List<Address> getAllAddress();
}
