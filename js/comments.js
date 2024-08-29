$(document).ready(function () {
    // 댓글 제출 버튼 클릭 이벤트
    $("#submitComment").click(function () {
        var name = $("#name").val().trim();
        var comment = $("#comment").val().trim();

        if (name && comment) {
            // 이름 길이 체크
            if (name.length > 4) {
                alert("이름은 최대 4글자까지만 입력 가능합니다.");
                return;
            }

            // 댓글 추가 함수 호출
            addComment(name, comment);
            // 입력 필드 초기화
            $("#name").val("");
            $("#comment").val("");
        } else {
            alert("이름과 댓글을 모두 입력해주세요.");
        }
    });

    // 수정 버튼 클릭 이벤트
    $(document).on("click", ".edit-btn", function () {
        var commentId = $(this).data("id");
        var commentTextElement = $(`#${commentId} .comment-text`);
        var currentText = commentTextElement.text().trim();

        // 텍스트를 입력 필드로 변경
        commentTextElement.html(
            `<input type="text" class="form-control edit-input" value="${currentText}">`
        );

        // 수정 버튼을 저장 버튼으로 변경
        $(this).text("저장").removeClass("edit-btn").addClass("save-btn");
    });

    // 저장 버튼 클릭 이벤트 (동적으로 생성된 요소에 대한 이벤트 처리)
    $(document).on("click", ".save-btn", function () {
        var commentId = $(this).data("id");
        var commentTextElement = $(`#${commentId} .comment-text`);
        var newText = commentTextElement.find(".edit-input").val().trim();

        if (newText !== "") {
            // 텍스트 업데이트
            commentTextElement.text(newText);

            // 버튼을 다시 수정 버튼으로 변경
            $(this).text("수정").removeClass("save-btn").addClass("edit-btn");
        } else {
            alert("댓글 내용을 입력해주세요.");
        }
    });

    // 삭제 버튼 클릭 이벤트
    $(document).on("click", ".delete-btn", function () {
        var commentId = $(this).data("id");
        if (confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
            $(`#${commentId}`).remove();
        }
    });

    // 이름 입력 필드에 대한 실시간 길이 제한
    $("#name").on("input", function () {
        if ($(this).val().length > 4) {
            $(this).val($(this).val().substr(0, 4));
        }
    });

    // 새 댓글 추가 함수
    function addComment(name, comment) {
        // 현재 날짜 및 시간 포맷팅
        var currentDate = new Date()
            .toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
            .replace(/\. /g, "-")
            .replace(".", "");

        // 새 댓글 HTML 생성
        var commentId = "comment-" + Date.now(); // 고유 ID 생성
        var newComment = `
        <li class="mb-3" id="${commentId}">
            <div class="comment-container d-flex">
                <div class="comment-name">
                    ${name}
                </div>
                <div class="comment-content flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start">
                        <p class="mb-1 comment-text">${comment}</p>
                        <div class="btn-group btn-group-sm" role="group" aria-label="Comment actions">
                            <button type="button" class="btn btn-outline-secondary btn-sm edit-btn" data-id="${commentId}">수정</button>
                            <button type="button" class="btn btn-outline-danger btn-sm delete-btn" data-id="${commentId}">삭제</button>
                        </div>
                    </div>
                    <small class="text-muted">${currentDate}</small>
                </div>
            </div>
        </li>
        `;
        // 새 댓글을 목록의 맨 앞에 추가
        $("#commentList").append(newComment);

        // 버튼에 호버 효과 추가
        $(".edit-btn, .delete-btn").hover(
            function () {
                $(this).css("opacity", "1");
            },
            function () {
                $(this).css("opacity", "0.6");
            }
        );
    }
});
