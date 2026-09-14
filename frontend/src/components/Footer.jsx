export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cols">
        <div>
          <h4>ReclaimR</h4>
          <p>Campus Item Recovery System</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <p>Home · Lost & Found · How It Works</p>
        </div>
        <div>
          <h4>Contact / Support</h4>
          <p>support@reclaimr.edu</p>
        </div>
      </div>
      <p>&copy; {new Date().getFullYear()} ReclaimR. All rights reserved.</p>
    </footer>
  );
}
