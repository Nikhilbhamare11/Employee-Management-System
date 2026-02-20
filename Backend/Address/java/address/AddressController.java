package addr;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	public ResponseEntity<Address> add(@RequestBody Address r) {
		as.addRes(r);
		return new ResponseEntity<>(r, HttpStatus.CREATED);
	}
		
	@GetMapping("/{id}")
	public ResponseEntity<Address> fetch(@PathVariable int id) {
		Address r = as.fetchAdd(id);
		return ResponseEntity.ok(r);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> delete(@PathVariable int id) {
		as.deleteAddress(id);
		return ResponseEntity.ok("Address deleted successfully");
	}
	
	@GetMapping
	public ResponseEntity<List<Address>> getall(){
		return ResponseEntity.ok(as.getallAddress());
	}	
	
	@PutMapping("/{id}")
	public ResponseEntity<Address> updateEmp(@PathVariable int id, @RequestBody Address ad) {
		Address updates = as.updateAddress(id,ad);
		return ResponseEntity.ok(updates);
	}
}
