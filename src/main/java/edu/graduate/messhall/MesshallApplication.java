package edu.graduate.messhall;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan /*going to scan the class in the package, if it is a servlet component*/
public class MesshallApplication {

	public static void main(String[] args) {
		SpringApplication.run(MesshallApplication.class, args);
	}

}

