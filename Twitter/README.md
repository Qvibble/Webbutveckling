Frontend funktioner:
	-init
		-Kallar på frontend funktioner: formSettings, fetchRandomPosts, createPosts, createLoginMessage
 
	-formSettings
		-Kallar på frontend funktionen: createBackButton

	-createBackButton
		-Kallar inte på någon funktion

	-createLogInMessage
		-Kallar inte på någon fukntion

	-createPosts
		-Kallar inte på någon funktion

	-logIn
		-Kallar på backend via fetch:
			-Backend kör funktionen validateUser som kör:
				-createUser, checkUser

	-logOut
		-Kallar inte på någon funktion

	-back
		-Kallar inte på någon funktion

	-search
		-Kallar på backend via fetch:
			-Backend kör funktionen getPosts som kör:
				-getPosts

	-createUser
		-Kallar på backend via fetch:
			-Backend kör funktionen createUser som kör:
				-saveUser

	-fetchRandomPosts
		-Kallar på backend via fetch:
			-Backend kör funktionen getPosts som kör:
				-getPosts
	-publishPost
		-Kallar på backend via fetch:
			-Backend kör funktionen createPost som kör:
				-createPost, getPosts