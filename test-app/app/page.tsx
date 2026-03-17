import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ padding: "2rem", maxWidth: 600 }}>
      <h1>Blog Test App</h1>
      <p>
        Test app for <code>@pamfilico/adminfast-ui</code> blog components with mocked data.
      </p>
      <p>
        The <code>apiBaseUrl</code> prop overrides the data source. This app uses the local mock API
        at <code>/api/blogs</code>.
      </p>
      <ul>
        <li>
          <Link href="/blogs">Blog list</Link>
        </li>
        <li>
          <Link href="/blogs/how-to-rent-a-car">Sample post</Link>
        </li>
      </ul>
    </div>
  );
}
