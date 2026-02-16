package emp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
	@Autowired
	EmployeeRepository er;
	
	@Autowired
	AddressClient ac;

	public void addEmp(Employee e) {
		er.save(e);
	}

	public Employee fetchEmp(int id) {
		Employee e = er.findById(id).orElse(null);
		Address a = ac.getAdd(id);
		e.setA(a);
		return e;
	}

}
