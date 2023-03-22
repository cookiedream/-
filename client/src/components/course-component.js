/* eslint-disable react-hooks/exhaustive-deps */ // 禁用 React hooks 相關的錯誤提示，因為在 useEffect 中使用了空的依賴列表。
import React, { useState, useEffect } from "react"; // 引入 React 和 useState, useEffect 鉤子。
import { useNavigate } from "react-router-dom"; // 引入 useNavigate 鉤子。
import CourseService from "../services/course.service"; // 引入與課程相關的服務。

const CourseComponent = ({ currentUser, setCurrentUser }) => {
  // 定義課程組件，接受兩個屬性 currentUser 和 setCurrentUser。
  const navigate = useNavigate(); // 創建一個 navigate 函數，以便在使用者單擊按鈕時跳轉到其他頁面。
  const handleTakeToLogin = () => {
    // 定義一個 handleTakeToLogin 函數，在使用者單擊按鈕時將用戶帶到登錄頁面。
    navigate("/login"); // 跳轉到登錄頁面。
  };
  const [courseData, setCourseData] = useState(null); // 創建一個 state 變量 courseData，存儲課程數據。

  useEffect(() => {
    // 副作用鉤子，每當 currentUser 發生變化時，獲取課程數據。
    let _id;
    if (currentUser) {
      // 如果當前用戶已經登錄。
      _id = currentUser.user._id; // 獲取用戶 ID。
      if (currentUser.user.role === "instructor") {
        // 如果當前用戶是講師。
        CourseService.get(_id) // 獲取講師所教授的課程。
          .then((data) => {
            setCourseData(data.data); // 更新 courseData 的狀態。
          })
          .catch((e) => {
            console.log(e); // 如果出現錯誤，則在控制台上輸出錯誤信息。
          });
      } else if (currentUser.user.role === "student") {
        // 如果當前用戶是學生。
        CourseService.getEnrolledCourses(_id) // 獲取學生所註冊的課程。
          .then((data) => {
            console.log(data); // 在控制台上輸出課程資訊。
            setCourseData(data.data); // 更新 courseData 的狀態。
          })
          .catch((e) => {
            console.log(e); // 如果出現錯誤，則在控制台上輸出錯誤信息。
          });
      }
    }
  }, []);

  // 建立名為 handleDelete 的函式，接收一個參數 _id
  const handleDelete = (_id) => {
    // 如果目前的使用者存在，且使用者的角色為講師
    if (currentUser && currentUser.user.role === "instructor") {
      // 顯示一個確認訊息框，讓使用者確認是否要刪除
      const result = window.confirm("確定要刪除嗎？");
      // 如果使用者確認要刪除
      if (result) {
        // 呼叫 CourseService 的 delete 函式，傳入 _id 參數
        CourseService.delete(_id);
        // 重新載入頁面
        window.location.reload("重新整理頁面");
      } else {
        // 如果使用者取消刪除，不做任何事情
      }
    } else {
      // 如果使用者不存在或使用者的角色不是講師，顯示一個訊息在控制台中
      console.log("只有講師可以刪除課程。");
    }
  };

  const handlePatch = (_id) => {
    if (currentUser && currentUser.user.role === "instructor") {
      CourseService.patch(_id)
        .then(() => {
          // 重新載入頁面
          window.location.reload("重新整理頁面");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log("只有講師可以編輯課程。");
    }
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>您必須先登入才能看到課程。</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            回到登入頁面
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === "instructor" && (
        <div>
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            歡迎來到講師的課程頁面
          </h1>
        </div>
      )}
      {currentUser && currentUser.user.role === "student" && (
        <div>
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            歡迎來到學生的課程頁面。
          </h1>
        </div>
      )}
      {currentUser && courseData && courseData.length !== 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {courseData.map((course) => {
            return (
              <div className="card" style={{ width: "18rem", margin: "1rem" }}>
                <div
                  className="card-body"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <h5 className="card-title">課程名稱:{course.title}</h5>
                  <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                    {course.description}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    學生人數: {course.students.length}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    課程價格: {course.price}
                  </p>
                  {currentUser && currentUser.user.role === "instructor" && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => handleDelete(course._id)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        class="btn btn-success"
                        onClick={() => handlePatch(course._id)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
