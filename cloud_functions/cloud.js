Moralis.Cloud.define("isAdmin", async (request) => {
  const roleQuery = new Moralis.Query("_Role");
  roleQuery.equalTo("name", "admin");
  const adminRole = await roleQuery.first({ useMasterKey: true });
  const adminUsersQuery = adminRole.get("users").query();
  const adminUsers = await adminUsersQuery.find({ useMasterKey: true });
  const index = adminUsers.findIndex((user) => {
    return user.id == request.user.id;
  });
  return index != -1;
});
