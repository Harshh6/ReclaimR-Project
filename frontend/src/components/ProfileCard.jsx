export default function ProfileCard({ user }) {
  return (
    <div className="card" style={{ maxWidth: 420, margin: "0 auto" }}>
      <div className="profile-circle-lg">👤</div>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}
