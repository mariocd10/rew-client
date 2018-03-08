package controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;

import models.User;
import play.libs.Json;
import play.data.Form;
import play.data.validation.Constraints.*;
import play.mvc.Controller;
import play.mvc.Result;

// Application.java
public class Application extends Controller {

	public Result signup() {
		Form<SignUp> signUpForm = Form.form(SignUp.class).bindFromRequest();

		if (signUpForm.hasErrors()) {
			return badRequest(signUpForm.errorsAsJson());
		}
		SignUp newUser = signUpForm.get();
		User existingUser = User.findByEmail(newUser.email);
		if (existingUser != null) {
			return badRequest(buildJsonResponse("error", "User exists"));
		} else {
			User user = new User();
			user.setEmail(newUser.email);
			user.setPassword(newUser.password);
			user.save();
			session().clear();
			session("username", newUser.email);

			return ok(buildJsonResponse("success", "User created successfully"));
		}
	}
	
//	public static Result login() {
//		 Form<Login> loginForm = Form.form(Login.class).bindFromRequest();
//		 if (loginForm.hasErrors()) {
//		   return badRequest(loginForm.errorsAsJson());
//		 }
//		 Login loggingInUser = loginForm.get();
//		 User user = User.findByEmailAndPassword(loggingInUser.email, loggingInUser.password);
//		 if(user == null) {
//		   return badRequest(buildJsonResponse("error", "Incorrect email or password"));
//		 } else {
//		   session().clear();
//		   session("username", loggingInUser.email);
//
//		   ObjectNode wrapper = Json.newObject();
//		   ObjectNode msg = Json.newObject();
//		   msg.put("message", "Logged in successfully");
//		   msg.put("user", loggingInUser.email);
//		   wrapper.put("success", msg);
//		   return ok(wrapper);
//		 }
//		}

	public static class UserForm {
		@Required
		@Email
		public String email;
	}

	public static class SignUp extends UserForm {
		@Required
		@MinLength(6)
		public String password;
	}

	private static ObjectNode buildJsonResponse(String type, String message) {
		ObjectNode wrapper = Json.newObject();
		
		ObjectNode msg = Json.newObject();
		msg.put("message", message);
		wrapper.put(type, msg);
		return wrapper;
	}

}