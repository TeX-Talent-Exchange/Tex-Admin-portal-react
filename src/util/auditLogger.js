import axios from "./Api";
// import publicIp from "public-ip";

export async function auditPostMiddleware(url, currentUser, param1, ...param2) {
  const body = {
    data: param1,
    auditLog: {
      userId: currentUser?.authUser?.username,
      activity: param2[0],
      description: param2[1],
      page: param2[2]
      // ipAddress: await publicIp.v4(),
      // hostName: (await publicIp.v4()).split(".")[0],
    },
  };
  return await axios.post(`/${url}`, body);
}

export async function auditPutMiddleware(url, currentUser, param1, ...param2) {
  const body = {
    data: param1,
    auditLog: {
      userId: currentUser?.authUser?.username,
      activity: param2[0],
      description: param2[1],
      page: param2[2]
      // ipAddress: await publicIp.v4(),
      // hostName: (await publicIp.v4()).split(".")[0],
    },
  };
  return await axios.put(`/${url}`, body);
}
export async function auditDeleteMiddleware(url, currentUser, ...param2) {
  const body = {
    data: param2[3],
    auditLog: {
      userId: currentUser?.authUser?.username,
      activity: param2[0],
      description: param2[1],
      page: param2[2]
      // ipAddress: await publicIp.v4(),
      // hostName: (await publicIp.v4()).split(".")[0],
    },
  };
  return await axios.delete(`/${url}`, { data: body });
}
