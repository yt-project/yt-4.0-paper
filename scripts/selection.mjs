graph TD
    A(Selector) --> B{Field Index Type}
    B -->|Discrete| D1[Bitmap Selection]
    B -->|Grid| G1(Next Grid)
    G1 --> G2{Bounding Box}
    G2 --> |Not Included| G1
    G2 --> |Included| G3[Cell Selection]
    B -->|Octree| O1[Recursive Oct<br>Visitation]
    D1 -->|IO| D2[Point Selection]
    G3 --> |IO| R[Chunk Results]
    O1 --> R
    D2 --> |Filter| R
