// userUtils.js
import { useQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { GET_USER_BY_EMAIL, INSERT_USER, GET_USER_AND_API_CALLS } from "../graphql/queries"; // Adjust the path as needed

export function useCheckAndInsertUser(session) {
  const router = useRouter();
  const userEmail = session?.user?.email;

//   console.log("User email:", userEmail);

  const { loading, error, data } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: userEmail },
    skip: !userEmail,
  });

//   console.log("User data:", data);

  const [insertUser] = useMutation(INSERT_USER);

  useEffect(() => {
    if (loading) {
        console.log("Loading...");
        return;
    }

    if (error) {
    console.error("Error fetching data:", error);
    return;
    }

    if (session && data) {
        // console.log("Inside session");
        // console.log("User data:", data);

        if (data?.Users.length === 0) {
        // Insert the user into the database
        console.log("User does not exist, inserting...");
        insertUser({
          variables: { email: userEmail, username: session.user.name },
        })
          .then(() => {
            router.push("/dashboard");
          })
          .catch((e) => {
            console.error("Failed to insert user:", e);
          });
      } else {
        // User exists, navigate to dashboard
        console.log("User exists, navigating to dashboard...");
        router.push("/loginNavigate");
      }
    }
  }, [session, data, loading, error]);
}

export function useGetUserAndApiCalls(session) {
    const userEmail = session?.user?.email;
    
    const { loading, error, data } = useQuery(GET_USER_AND_API_CALLS, {
        variables: { email: userEmail },
        skip: !userEmail,
    });
    // console.log("User data:", data);
    
    // useEffect(() => {
    //     if (loading) {
    //         console.log("Loading...");
    //         return;
    //     }
    
    //     if (error) {
    //         console.error("Error fetching data:", error);
    //         return;
    //     }
    
    //     if (data) {
    //         console.log("Fetched Data:", data.Users_by_pk.Api_calls);
    //         return data.Users_by_pk.Api_calls;
    //     }
    // }, [data, loading, error]);
}
