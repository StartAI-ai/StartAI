<?php
include 'db.php';

$id = $_GET['id'];

$sql = "DELETE FROM usuarios WHERE id=$id";

if (mysqli_query($conn, $sql)) {
    echo "Usuário excluído com sucesso!";
} else {
    echo "Erro: " . mysqli_error($conn);
}

mysqli_close($conn);
?>