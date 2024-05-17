<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id)) {
    $id = $data->id;

    $stmt = $conn->prepare("DELETE FROM documentation WHERE id = :id");
    $stmt->bindParam(':id', $id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Documentation deleted successfully"]);
    } else {
        echo json_encode(["message" => "Failed to delete documentation"]);
    }
} else {
    echo json_encode(["message" => "Invalid input"]);
}
?>
