export default function SignupPage(){
    return(
        <div>
            <h1>singup, Please...</h1>

            <form>
                
                <label>
                    username
                    <input type="text" name="username" required />
                </label>

                <label>
                    Email
                    <input type="email" name="email" required />
                </label>

                <label>
                    Address
                    <input type="text" name="address" required />
                </label>

                <label>
                    Phone
                    <input type="tel" name="phone" required />
                </label>

                <label>
                Password
                <input type="password" name="password" required />
              </label>

              <label>
                Password2
                <input type="password" name="password2" required />
              </label>
            </form>
        </div>
    )
}