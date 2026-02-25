package emp;

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
@RequestMapping("/emp")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeController {
	@Autowired
	EmployeeService es;
	
	@PostMapping
	public ResponseEntity<Employee> add(@RequestBody Employee e) {
		es.addEmp(e);
		return new ResponseEntity<>(e, HttpStatus.CREATED);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Employee> fetch(@PathVariable int id) {
		Employee e = es.fetchEmp(id);
        return ResponseEntity.ok(e);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> delete(@PathVariable int id) {
		es.deleteEmp(id);
		return ResponseEntity.ok("Employee Deleted Successfully");
	}
	
	@GetMapping
	public ResponseEntity<List<Employee>> getall(){
		return ResponseEntity.ok(es.getallEmp());
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Employee> updateEmp(@PathVariable int id, @RequestBody Employee em) {
		es.updateEmp(id,em);
		return ResponseEntity.ok(es.fetchEmp(id));
	}
}
