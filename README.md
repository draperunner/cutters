# Cutters :haircut:

Get Cutters hair salons sorted by wait time in the terminal.

```
$ npx cutters | grep Oslo | head -3
Oslo City                     Oslo          2 min    2 waiting
Stortingsgata                 Oslo          8 min    1 waiting
Gunerius                      Oslo          12 min    0 waiting
```

Just run this:

```
npx cutters
```

Or install it first, if that's your style:

```
npm i -g cutters
cutters
```

Manipulate the result with common bash commands:

```
npx cutters | grep Oslo | head -3
```

Need to follow how wait times are changing?

```
watch -n 10 'cutters | grep Oslo | head -10'
```
