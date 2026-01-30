import "../css/StatusView.css";

function StatusView({ status, onClose }) {
    if (!status) return null;

    return (
        <div className="status-view-overlay" onClick={onClose}>
            <div className="status-view-container" onClick={(e) => e.stopPropagation()}>
                <div className="status-view-header">
                    <div className="status-view-profile">
                        <img 
                            src={status.avatar} 
                            alt={status.name} 
                            className="status-view-avatar" 
                        />
                        <div className="status-view-info">
                            <h3>{status.name}</h3>
                            <p>{status.isMyStatus ? "My Status" : "Today at 12:30 PM"}</p>
                        </div>
                    </div>
                    <div className="status-view-actions">
                        <i className="bi bi-telephone-fill"></i>
                        <i className="bi bi-three-dots-vertical"></i>
                    </div>
                </div>
                
                <div className="status-view-content">
                    <div className="status-view-image">
                        <img src={status.avatar} alt={status.name} />
                        <div className="status-progress">
                            <div className="progress-bar">
                                <div className="progress-fill"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="status-view-footer">
                    <input 
                        type="text" 
                        placeholder="Reply to..." 
                        className="status-reply-input" 
                    />
                    <button className="status-reply-btn">
                        <i className="bi bi-send-fill"></i>
                    </button>
                </div>

                <button className="status-close-btn" onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
        </div>
    );
}

export default StatusView;
