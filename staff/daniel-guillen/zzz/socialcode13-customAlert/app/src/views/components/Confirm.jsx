export default ({ message, onAccept, onCancel }) => <div class="Confirm">
    <div class="ConfirmBox">
        <p>{message}</p>
        <button class="Button" onClick={onCancel}>Cancel</button>
        <button class="Button" onClick={onAccept}>Confirm</button>
    </div>
</div>