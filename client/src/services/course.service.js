// 導入axios套件
import axios from "axios";
// 設定API路徑
const API_URL = "http://localhost:8080/api/courses";

class CourseService {
  // 提交課程資訊
  post(title, description, price) {
    // 取得localStorage中的token
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    // 透過axios.post方法，傳送title、description、price給API
    // 並在header中附上Authorization: token
    return axios.post(
      API_URL,
      { title, description, price },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  // 透過學生id，取得該學生註冊的課程
  getEnrolledCourses(_id) {
    // 取得localStorage中的token
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    // 透過axios.get方法，傳送API_URL/student/_id給API
    // 並在header中附上Authorization: token
    return axios.get(API_URL + "/student/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  // 透過instructor id，取得該講師擁有的課程
  get(_id) {
    // 取得localStorage中的token
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    // 透過axios.get方法，傳送API_URL/instructor/_id給API
    // 並在header中附上Authorization: token
    return axios.get(API_URL + "/instructor/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
  // 檢查本地存儲是否有用戶信息，如果有則從中提取出用戶的 token，否則將 token 設置為空字符串。
  delete(_id) {
    // 建立一個變量 token，用於存儲從本地存儲中讀取的用戶令牌
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    // 使用 Axios 庫發送 HTTP DELETE 請求，刪除指定 ID 的教練。
    return axios.delete(API_URL + "/" + _id, {
      headers: {
        Authorization: token, // 在請求頭中傳遞 token 以驗證用戶身份。
      },
    });
  }

  // 定義一個名為 patch 的函式，接收一個 _id 參數
  patch(_id) {
    // 建立一個變量 token，用於存儲從本地存儲中讀取的用戶令牌
    let token;
    if (localStorage.getItem("user")) {
      // 如果 localStorage 中存在 user 項目，則從中讀取 token 並解析為 JSON 格式
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      // 否則，將 token 設置為空字符串
      token = "";
    }

    // 使用 axios 庫的 patch() 方法發送一個 PATCH 請求，該請求向 API_URL + "/" + _id 發送請求
    // 並傳遞一個參數對象，該對象包含了請求頭的 Authorization 屬性，其值為上面定義的 token
    return axios.patch(API_URL + "/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  // 取得指定課程名稱的課程
  getCourseByName(name) {
    // 從 localStorage 取得使用者 token，若無則為空字串
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    // 使用 axios 呼叫 API，傳入 API_URL/findByName/name，header 中帶入 token，並回傳 Promise
    return axios.get(API_URL + "/findByName/" + name, {
      headers: {
        Authorization: token,
      },
    });
  }

  // 報名指定 _id 的課程
  enroll(_id) {
    // 從 localStorage 取得使用者 token，若無則為空字串
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    // 使用 axios 呼叫 API，傳入 API_URL/enroll/_id，header 中帶入 token，並回傳 Promise
    return axios.post(
      API_URL + "/enroll/" + _id,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

// 將 CourseService 類別 export，讓其他模組可以使用
export default new CourseService();
