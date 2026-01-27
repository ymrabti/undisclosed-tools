import sys


class Solution:
    def findTheWinner(self, n: int, k: int) -> int:
        # Initialize list of N friends, labeled from 1-N
        circle = list(range(1, n + 1))

        # Maintain the index of the friend to start the count on
        start_index = 0

        # Perform eliminations while there is more than 1 friend left
        while len(circle) > 1:
            # Calculate the index of the friend to be removed
            removal_index = (start_index + k - 1) % len(circle)

            # Remove the friend at removal_index
            circle.pop(removal_index)

            # Update the start_index for the next round
            start_index = removal_index

        return circle[0]

    def findTheWinner2(self, n: int, k: int) -> int:
        # Initialize deque with n friends
        circle = deque(range(1, n + 1))

        # Perform eliminations while more than 1 player remains
        while len(circle) > 1:
            # Process the first k-1 friends without eliminating them
            for _ in range(k - 1):
                circle.append(circle.popleft())
            # Eliminate the k-th friend
            circle.popleft()

        return circle[0]

    def findTheWinner3(self, n: int, k: int) -> int:
        return self.winnerHelper3(n, k) + 1

    def winnerHelper3(self, n: int, k: int) -> int:
        if n == 1:
            return 0
        return (self.winnerHelper3(n - 1, k) + k) % n

    def findTheWinner4(self, n: int, k: int) -> int:
        ans = 0
        for i in range(2, n + 1):
            ans = (ans + k) % i
        # add 1 to convert back to 1 indexing
        return ans + 1

    def josephus(self, people, k, idx):
        if len(people) == 1:
            return people[0]

        # find the index (person) to be deleted
        idx = (idx + k - 1) % len(people)  # k-1 due to 0-based index

        people.pop(idx)

        return self.josephus(people, k, idx)

    def findTheWinner5(self, n, k):
        people = list(range(1, n + 1))
        return self.josephus(people, k, 0)

    def test(self) -> None:
        print("Testing Josephus Problem Solutions")
        assert self.findTheWinner(5, 2) == 3
        assert self.findTheWinner(6, 5) == 1
        assert self.findTheWinner2(5, 2) == 3
        assert self.findTheWinner2(6, 5) == 1
        assert self.findTheWinner3(5, 2) == 3
        assert self.findTheWinner3(6, 5) == 1
        assert self.findTheWinner4(5, 2) == 3
        assert self.findTheWinner4(6, 5) == 1
        assert self.findTheWinner5(5, 2) == 3
        assert self.findTheWinner5(6, 5) == 1
        print("All tests passed!")


from collections import deque

if __name__ == "__main__":
    sol = Solution()
    # parameterized test
    if len(sys.argv) == 3:
        n = int(sys.argv[1])
        k = int(sys.argv[2])
        print(f"The winner in method 1 is: {sol.findTheWinner(n, k)}")
        print(f"The winner in method 2 is: {sol.findTheWinner2(n, k)}")
        print(f"The winner in method 3 is: {sol.findTheWinner3(n, k)}")
        print(f"The winner in method 4 is: {sol.findTheWinner4(n, k)}")
        print(f"The winner in method 5 is: {sol.findTheWinner5(n, k)}")
    else:
        sol.test()
