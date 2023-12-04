import { route } from '../../router.js';
import { getFileRequest } from '../supabase/GenericSupabase.js';
import { getProfile, updateProfile } from '../supabase/users.js';

export { profileForm };

function profileForm() {
  // let dataProfile = JSON.parse(localStorage.getItem('dataProfile'));
  const divLogin = document.createElement('div');
  divLogin.classList.add('formulari_centrat');

  getProfile().then((dataProfile) => {
    dataProfile = dataProfile[0];
    console.log(dataProfile);

    divLogin.innerHTML = `<form action="action_page.php" id="formProfile" style="border: 1px solid #ccc" class="container mt-5">
    <h1 class="mb-4">Profile</h1>
    <hr />

    <div class="form-group">
        <label for="signupemail"><b>Email</b></label>
        <input
            id="signupemail"
            type="text"
            placeholder="Enter Email"
            name="email"
            class="form-control"
            required
            readonly
            value="${localStorage.getItem('email')}"
        />
    </div>

    <div class="form-group">
        <label for="signuppassword"><b>Password</b></label>
        <input
            type="password"
            id="signuppassword"
            placeholder="Enter Password"
            name="psw"
            class="form-control"
            required
        />
    </div>

    <div class="form-group">
        <label for="psw-repeat"><b>Repeat Password</b></label>
        <input
            type="password"
            placeholder="Repeat Password"
            name="psw-repeat"
            class="form-control"
            required
        />
        <button type="button" class="btn btn-secondary mt-2" id="chgpass">Change Password</button>
    </div>

    <div class="form-group">
        <label for="username"><b>Username</b></label>
        <input
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            class="form-control"
            value="${dataProfile.username}"
        />
    </div>

    <div class="form-group">
        <label for="full_name"><b>Full Name</b></label>
        <input
            type="text"
            placeholder="Full Name"
            name="full_name"
            class="form-control"
            value="${dataProfile.full_name}"
        />
    </div>

    

    <div class="form-group">
        <img class="avatar_profile img-fluid" id="avatar_prev" src="${dataProfile.avatar_blob ? dataProfile.avatar_blob : ''}" />
    </div>

    <div class="form-group">
        <label for="avatar"><b>Avatar</b></label>
        <input
            type="file"
            id="avatar"
            name="avatar"
            class="form-control-file"
        />
    </div>

    <div class="clearfix">
        <button type="button" class="btn btn-primary" id="update">Update Profile</button>
    </div>
</form>
`;
    divLogin.querySelector('#update').addEventListener('click', async () => {
      const formData = new FormData(divLogin.querySelector('#formProfile'));
      const {
        username, full_name, website, avatar,
      } = Object.fromEntries(formData);
      console.log({
        username, full_name, website, avatar,
      });

      const dataUpdate = await updateProfile({
        username, full_name, website, avatar,
      });

      route('#/profile');
    });

    function encodeImageFileAsURL(element) {
      const file = element.files[0];
      if (file) {
        divLogin.querySelector('#avatar_prev').src = URL.createObjectURL(file);
      }
    }

    divLogin.querySelector('#avatar').addEventListener('change', function () { encodeImageFileAsURL(this); });
  });

  return divLogin;
}