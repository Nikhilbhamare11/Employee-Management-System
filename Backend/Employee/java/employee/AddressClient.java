package emp;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(url = "http://localhost:8082/add", value = "address")
public interface AddressClient {
	@GetMapping("/{id}")
	public Address getAdd(@PathVariable("id") int id);

	@GetMapping
	public List<Address> getAllAddress();
	
	@DeleteMapping("/{id}")
    void deleteAddress(@PathVariable int id);

    @PutMapping("/{id}")
    Address updateAddress(@PathVariable int id, @RequestBody Address a);

    @PostMapping
    Address addAddress(@RequestBody Address a);
}
