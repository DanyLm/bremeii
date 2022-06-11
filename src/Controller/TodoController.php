<?php

namespace App\Controller;

use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Todo;
use App\Form\TodoType;
use Exception;
use phpDocumentor\Reflection\PseudoTypes\True_;

#[Route('/api/todo', name: 'api_todo_')]
class TodoController extends AbstractController
{

    private $entityManager;
    private $todoRepository;

    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository)
    {
        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;
    }

    #[Route('/read', name: 'api_todo_read')]
    public function index(): JsonResponse
    {
        $todos = $this->todoRepository->findAll();
        $data = [];
        foreach ($todos as $todo) {
            $data[] = $todo->toArray();
        }

        return $this->json($data);
    }

    #[Route('/create', name: 'api_todo_create')]
    public function create(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent());

        $form = $this->createForm(TodoType::class);
        $form->submit((array) $content);

        if (!$form->isValid()) {

            $errors = [];
            foreach ($form->getErrors(true, true) as $error) {
                $propertyName = $error->getOrigin()->getName();
                $errors[$propertyName] = $error->getMessage();
            }


            return $this->json(
                [
                    'message' => [
                        'text' => [join("\n", $errors)],
                        'level' => 'error'
                    ],
                ],
                400
            );
        }

        $todo = new Todo();
        $todo->setName($content->name);

        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
        } catch (Exception $e) {
            return $this->json(
                [
                    'message' =>
                    [
                        'text' => ["Could not submit that todo to database"],
                        'level' => 'error'
                    ]
                ],
                400
            );
        }

        return $this->json(
            [
                'todo' => $todo->toArray(),
                'message' =>
                [
                    'text' => [
                        "Todo created successfully",
                        "Task: {$todo->getName()}"
                    ],
                    'level' => 'success'
                ]
            ]
        );
    }

    #[Route('/update/{id}', name: 'api_todo_update', methods: ['PUT'])]
    public function update(Request $request, Todo $todo): JsonResponse
    {
        $content = json_decode($request->getContent());

        $form = $this->createForm(TodoType::class);
        $form->submit((array) $content);

        if (!$form->isValid()) {

            $errors = [];
            foreach ($form->getErrors(true, true) as $error) {
                $propertyName = $error->getOrigin()->getName();
                $errors[$propertyName] = $error->getMessage();
            }


            return $this->json(
                [
                    'message' => [
                        'text' => [join("\n", $errors)],
                        'level' => 'error'
                    ],
                ],
                400
            );
        }

        if ($content->name === $todo->getName()) {
            return $this->json(
                [
                    'message' =>
                    [
                        'text' => ["No changes were made"],
                        'level' => 'info'
                    ]
                ]
            );
        }

        $todo->setName($content->name);


        try {
            $this->entityManager->flush();
        } catch (Exception $e) {
            return $this->json(
                [
                    'message' =>
                    [
                        'text' => ["Could not update that todo, try again"],
                        'level' => 'error'
                    ]
                ],
                400
            );
        }

        return $this->json(
            [
                'todo' => $todo->toArray(),
                'message' =>
                [
                    'text' => [
                        "Todo updated successfully",
                        "Task: {$todo->getName()}"
                    ],
                    'level' => 'success'
                ]
            ]
        );
    }

    #[Route('/delete/{id}', name: 'api_todo_delete', methods: ['DELETE'])]
    public function delete(Todo $todo): JsonResponse
    {
        $deletedTodo = $todo->toArray();

        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $e) {
            return $this->json(
                [
                    'message' =>
                    [
                        'text' => ["Could not delete that todo, try again"],
                        'level' => 'error'
                    ]
                ],
                400
            );
        }

        return $this->json(
            [
                'todo' => $deletedTodo,
                'message' =>
                [
                    'text' => [
                        "Todo deleted successfully",
                        "Task: " . $deletedTodo['name']
                    ],
                    'level' => 'success'
                ]
            ]
        );
    }
}
