package addr;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
public class AddressService {
	@Autowired
	AddressRepository ar;
	
	public Address addRes(Address a) {
		return ar.save(a);
	}

	public Address fetchAdd(int id) {
		return ar.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND, "Address not found"));
	}

	public void deleteAddress(int id) {
		if (!ar.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Address not found");
        }
		ar.deleteById(id);
	}

	public List<Address> getallAddress() {
		return ar.findAll();
	}

	public Address updateAddress(int id, Address ad) {
		Address a1 = ar.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND, "Address not found"));
//		a1.setId(ad.getId());
		a1.setBuilding_no(ad.getBuilding_no());
		a1.setLandmark(ad.getLandmark());
		a1.setPincode(ad.getPincode());
		return ar.save(a1);
	}
}
