<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->title) && isset($data->content)) {
    $title = $data->title;
    $content = $data->content;

    $stmt = $conn->prepare("INSERT INTO documentation (title, content) VALUES (:title, :content)");
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':content', $content);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Documentation added successfully"]);
    } else {
        echo json_encode(["message" => "Failed to add documentation"]);
    }
} else {
    echo json_encode(["message" => "Invalid input"]);
}
?>
