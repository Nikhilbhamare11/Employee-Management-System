package emp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	public void add(@RequestBody Employee e) {
		es.addEmp(e);
	}
	
	@GetMapping("/{id}")
	public Employee fetch(@PathVariable int id) {
		return es.fetchEmp(id);
	}
}
