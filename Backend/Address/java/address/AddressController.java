package addr;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/add")
@CrossOrigin(origins = "http://localhost:4200")
public class AddressController {
	@Autowired
	AddressService as;
	
	@PostMapping
	public void add(@RequestBody Address r) {
		as.addRes(r);
	}
	
	@GetMapping("{id}")
	public Address fetch(@PathVariable int id) {
		return as.fetchAdd(id);
	}
}
