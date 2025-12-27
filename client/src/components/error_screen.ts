import type { APP_ERROR } from "../../../shared/types";

const error_screen = (error: APP_ERROR) => {
    const screen  = document.createElement("div")
    screen.innerHTML =`
<div class="error-screen">
    <div class="error-container">
        <div class="title">
        <p class="error-type">
            ${error.type.toLocaleLowerCase()}  error
        </p>
        <p class="status">
            ${error.status}
        </p>
    </div>
    <div class="message">
        <p>
            ${error.message}
        </p>
    </div>
    <div class="error-actions">
        <button onclick="location.reload()">
            reload
        </button>
    </div>
    </div>
</div>
`
return screen
};

export default error_screen