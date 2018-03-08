package models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.avaje.ebean.Model;
//PostComment.java
import com.avaje.ebean.annotation.JsonIgnore;

@Entity
public class PostComment extends Model {

	@Id
	public Long id;

	@ManyToOne
	@JsonIgnore
	public BlogPost blogPost;

	@ManyToOne
	public User user;

	@Column(columnDefinition = "TEXT")
	public String content;

	public static final Finder<Long, PostComment> find = new Finder<Long, PostComment>(Long.class, PostComment.class);

	public static List<PostComment> findAllCommentsByPost(final BlogPost blogPost) {
		return find.where().eq("post", blogPost).findList();
	}

	public static List<PostComment> findAllCommentsByUser(final User user) {
		return find.where().eq("user", user).findList();
	}

}
