import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String encoded=new BCryptPasswordEncoder().encode("123");
		System.out.println("########### passwordEncoder.encode(\"123\")="+encoded);
		
		
		String encoded1=new BCryptPasswordEncoder().encode("password");
		System.out.println("########### passwordEncoder.encode(\"password\")="+encoded1);
		
		
	}

}
