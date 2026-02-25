package emp;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import feign.FeignException;

@Service
public class EmployeeService {
	@Autowired
	EmployeeRepository er;

	@Autowired
	AddressClient ac;

	public Employee addEmp(Employee e) {
		return er.save(e);
	}

	public Employee fetchEmp(int id) {
		Employee e = er.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));
		try {
			Address a = ac.getAdd(id);
			e.setA(a);
		} catch (FeignException.NotFound ex) {
			e.setA(null);
		}
		return e;
	}

	public void deleteEmp(int id) {
		if (!er.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");
		}
		// System.out.println("DELETE REQUEST RECEIVED");
		er.deleteById(id);
		// System.out.println("Employee Deleted");
		try {
			// System.out.println("Calling Address Service...");
			ac.deleteAddress(id);
			// System.out.println("Address Deleted");
		} catch (Exception e) {
			System.out.println("Address Delete FAILED");
			e.printStackTrace();
		}
	}

	public List<Employee> getallEmp() {
		List<Employee> emps = er.findAll();
		List<Address> adds = ac.getAllAddress();
		// Convert addresses to Map for fast lookup
		Map<Integer, Address> addressMap = adds.stream().collect(Collectors.toMap(Address::getId, a -> a));
		// Match employee with address
		for (Employee e : emps) {
			e.setA(addressMap.get(e.getId()));
		}
		return emps;
	}

	public Employee updateEmp(int id, Employee em) {
		Employee e1 = er.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));
//		e1.setId(em.getId());
		e1.setName(em.getName());
		er.save(e1);
		try {
			if (em.getA() != null) {
				ac.updateAddress(id, em.getA());
			}
		} catch (Exception ex) {
			System.out.println("Address update failed");
			ex.printStackTrace();
		}
		return fetchEmp(id);
	}
}
