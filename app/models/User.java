package models;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.avaje.ebean.Model;
import com.avaje.ebean.annotation.JsonIgnore;

import play.data.validation.Constraints.*;


// User.java

@Entity
public class User extends Model {

 @Id
 public Long id;

 @Column(length = 255, unique = true, nullable = false)
 @MaxLength(255)
 @Required
 @Email
 public String email;

 @Column(length = 64, nullable = false)
 private byte[] shaPassword;

 @OneToMany(cascade = CascadeType.ALL)
 @JsonIgnore
 public List<BlogPost> posts;

 public void setPassword(String password) {
   this.shaPassword = getSha512(password);
 }

 public void setEmail(String email) {
   this.email = email.toLowerCase();
 }

 public static final Finder<Long, User> find = new Finder<Long, User>(
     Long.class, User.class);

 public static User findByEmailAndPassword(String email, String password) {
   return find
       .where()
       .eq("email", email.toLowerCase())
       .eq("shaPassword", getSha512(password))
       .findUnique();
 }

 public static User findByEmail(String email) {
   return find
       .where()
       .eq("email", email.toLowerCase())
       .findUnique();
 }

 public static byte[] getSha512(String value) {
   try {
     return MessageDigest.getInstance("SHA-512").digest(value.getBytes("UTF-8"));
   }
   catch (NoSuchAlgorithmException e) {
     throw new RuntimeException(e);
   }
   catch (UnsupportedEncodingException e) {
     throw new RuntimeException(e);
   }
 }
}