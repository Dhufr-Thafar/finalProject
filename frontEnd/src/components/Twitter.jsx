import {Form} from "react-bootstrap";
import axios from "axios";
import {useState, useEffect} from "react";

export default function Twitter(props) {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followees, setFollowees] = useState([]);
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);


  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "http://localhost:8081/api/users/search/" + props.username
      );
      setUsers(response.data.data.toSorted());
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "http://localhost:8081/api/users/followers/" + props.username
      );
      setFollowers(response.data.data.toSorted());
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "http://localhost:8081/api/users/followees/" + props.username
      );
      setFollowees(response.data.data.toSorted());
    };
    getData();
  }, []);

  useEffect(() => {
    loadTweets()
  }, []);

  function compareTweets(a, b) {
    return a.createAt == b.createAt ? 0 : (a.createAt < b.createAt ? -1 : 1)
  }

  function loadTweets() {
    const getData = async () => {
      const response = await axios.get(
        "http://localhost:8081/api/posts/tweets/" + props.username
      );
      setTweets(response.data.data.toSorted(compareTweets));
    };
    getData();
  }

  async function follow() {
    //props.username -> user

    const response = await axios
      .post("http://localhost:8081/api/users/follow", {
        follower: props.username,
        followee: user,
      })
      .then((response) => {
        setUsers(users.filter((x) => x != user));
        setFollowees(followees.concat([user]).toSorted());
        setUser("");
        loadTweets();
      })
      .catch((error) => {
        //TODO error handling
      });
  }


  async function postTweet() {
    //props.username -> user

    const response = await axios
      .post("http://localhost:8081/api/posts/tweet", {
        user: props.username,
        tweet: tweet
      })
      .then((response) => {
        setTweets(tweets.concat(response.data.data).toSorted(compareTweets));
        setTweet("")
      })
      .catch((error) => {
        //TODO error handling
      });
  }

  async function unfollow(followee) {
    //props.username -> use

    followee = followee.x;

    const response = await axios
      .post("http://localhost:8081/api/users/unfollow", {
        follower: props.username,
        followee: followee,
      })
      .then((response) => {
        setFollowees(followees.filter((x) => x != followee));
        setUsers(users.concat([followee]).toSorted());
        setTweets(tweets.filter((x) => x.user != followee))
      })
      .catch((error) => {
        //TODO error handling
      });
  }

  return (
    <>
      <div className="twitterPage">
        <div className="posts">
          <div className="tweet">
            <div>
              <textarea value={tweet} onChange={(x) => {setTweet(x.target.value)}} maxLength={255}/>
            </div>
            <div>
              <input
                type="button"
                onClick={postTweet}
                value="Tweet"
                disabled={tweet == ""}
              />
            </div>
          </div>

          <div className="tweets">
            {tweets.map((x, i) => (
                <div key={"div" + i}>
                  <span key={"span_1_" +i}>{x.user}</span> 
                  <span key={"span_2" + i}>{x.createdAt.split('T')[0]}</span>
                  <p key={"p" + i}>{x.tweet}</p>
                </div>
              ))}
          </div>

        </div>

        <div className="users">
          <div className="profile">
            <input type="button" onClick={props.logout} value="Logout" />
          </div>

          <div className="search">
            <Form.Select value={user} onChange={(e) => setUser(e.target.value)}>
              <option value=""></option>

              {users.map((x, i) => (
                <option key={i} value={x}>
                  {x}
                </option>
              ))}
            </Form.Select>
            <input
              type="button"
              onClick={follow}
              value="Follow"
              disabled={user == ""}
            />
          </div>

          <div className="followees">
            <div className="title">People you follow:</div>
            <ul>
              {followees.map((x, i) => (
                <li key={i}>
                  {x}{" "}
                  <input
                    type="button"
                    onClick={() => {
                      unfollow({ x });
                    }}
                    value="Unfollow"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="followers">
            <div className="title">Followers:</div>
            <ul>
              {followers.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
