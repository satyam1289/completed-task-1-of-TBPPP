document.addEventListener('DOMContentLoaded', () => {
    
    const subjects = document.querySelectorAll('.subject');
    const currentTime = new Date();
    
    
    function showDialog(event) {
        const subject = event.target.dataset.subject;
        const time = event.target.dataset.time;
        const faculty = event.target.dataset.faculty;

       
        const modal = document.createElement('div');
        modal.classList.add('modal');
        
        
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <h2>${subject}</h2>
                <p><strong>Time:</strong> <span id="subject-time">${time}</span></p>
                <p><strong>Faculty:</strong> ${faculty}</p>
                <button id="edit-btn" class="edit-btn">Edit</button>
                <div id="edit-form" class="edit-form" style="display: none;">
                    <label for="new-time">New Time:</label>
                    <input type="text" id="new-time" value="${time}" placeholder="e.g., 10:00-11:00">
                    <button id="save-btn" class="save-btn">Save</button>
                </div>
            </div>
        `;

        
        document.body.appendChild(modal);

        
        modal.style.display = 'block';

        
        modal.querySelector('.close-btn').onclick = function() {
            modal.style.display = 'none';
            modal.remove();
        };

        
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
                modal.remove();
            }
        };

        
        const editBtn = document.getElementById('edit-btn');
        const editForm = document.getElementById('edit-form');
        editBtn.addEventListener('click', () => {
            editForm.style.display = 'block'; // Show the edit form
        });

       
        const saveBtn = document.getElementById('save-btn');
        const newTimeInput = document.getElementById('new-time');
        saveBtn.addEventListener('click', () => {
            const newTime = newTimeInput.value;
            if (newTime) {
                event.target.dataset.time = newTime; // Update time in dataset
                document.getElementById('subject-time').textContent = newTime; // Update time in modal
                modal.remove(); // Close modal
            }
        });
    }

    
    function isOngoing(time) {
        const [start, end] = time.split('-');
        const [startHour, startMinute] = start.split(':').map(Number);
        const [endHour, endMinute] = end.split(':').map(Number);
        
        const currentHours = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();

        
        return (currentHours > startHour || (currentHours === startHour && currentMinutes >= startMinute)) &&
               (currentHours < endHour || (currentHours === endHour && currentMinutes <= endMinute));
    }

    
    subjects.forEach(subject => {
        subject.addEventListener('click', showDialog);

        
        const time = subject.dataset.time;
        if (isOngoing(time)) {
            subject.classList.add('ongoing');
        }
    });
});