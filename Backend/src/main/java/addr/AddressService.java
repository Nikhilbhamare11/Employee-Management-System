package addr;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService {
	@Autowired
	AddressRepository ar;
	
	public void addRes(Address a) {
		ar.save(a);
	}

	public Address fetchAdd(int id) {
		return ar.findById(id).orElse(null);
	}
}
